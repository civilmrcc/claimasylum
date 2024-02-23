import pgpy
import imap_tools
from imap_tools import MailBox, AND
import os
import json
import logging
import graypy
import base64,io
from fpdf import FPDF


logger = logging.getLogger('claimasylum_worker')
logger.setLevel(logging.DEBUG)

handler = graypy.GELFUDPHandler('graylog', 12201)
logger.addHandler(handler)

#Get public key for server and private key for worker
pub_key, _ = pgpy.PGPKey.from_file(str( '/code/publickeys/server.asc'))
priv_key, _ = pgpy.PGPKey.from_file(str('/code/privatekeys/worker.pgp'))

def gen_pdf(formdata):
    logger.debug('PDF generation started')
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=15)
    i = 1

    pdf.cell(200, 30, txt='Asylum Request', ln=1)
    pdf.set_font("Arial", size=12)
    cellheight = 30
    for key in formdata:
        if key == 'signature':
            # Step  1 &  2: Extract and decode the base64 image data
            image_data = str(formdata[key]).split(',')[1]
            decoded_image_data = base64.b64decode(image_data)

            # Step  3: Write the decoded data to a temporary file
            temp_file_path = '/tmp/temp_image.png'
            with open(temp_file_path, 'wb') as temp_file:
                temp_file.write(decoded_image_data)
            pdf.cell(200, 30, "Signature:")
            pdf.cell(200, 30,align='L', link=pdf.image(temp_file_path, 10, 8, 25), ln=1)
        elif key in ['polygon','locationInfo','image']:
            print("ignore key "+key)
        else:
            pdf.cell(200, 30, txt=key+' : '+str(formdata[key]).encode('utf-8').decode('latin-1'), ln=1)

        i += 1
    pdf.output("/code/pdfs/simple_demo.pdf")
    logger.debug('PDF generation done')

def send_mail(to):
    logger.debug('sending mail started')
    import smtplib
    from email.message import EmailMessage

    email_address = os.environ.get('EMAIL_FROM_MAIL')

    # create email
    msg = EmailMessage()
    msg['Subject'] = "New Asylum Request submitted"
    msg['From'] = email_address
    msg['To'] = to
    msg.set_content("Dear Sir or Madam,\nthere is a new asylum request in the pdf attached.\nBest regards")

    #add pdf attachment
    with open("/code/pdfs/simple_demo.pdf", 'rb') as f:
        file_data = f.read()
        msg.add_attachment(file_data, maintype="application", subtype="pdf", filename='asylum.pdf')

    # send email
    with smtplib.SMTP_SSL(os.environ.get('EMAIL_HOST'), 465) as smtp:
        smtp.login(os.environ.get('EMAIL_HOST_USER'), os.environ.get('EMAIL_HOST_PASSWORD'))
        smtp.send_message(msg)
        logger.debug('sending mail done')
def run():
    logger.debug('Worker started')
    print('Getting mails for '+os.environ.get('EMAIL_HOST_USER'))

    try:
        with MailBox(os.environ.get('EMAIL_HOST')).login(os.environ.get('EMAIL_HOST_USER'), os.environ.get('EMAIL_HOST_PASSWORD')) as mailbox:
            for msg in mailbox.fetch(mark_seen=False):
                print("found message in mailbox for ")
                if '\\Seen' not in msg.flags:

                    print(msg.flags)
                    print(msg.date, msg.subject, len(msg.text or msg.html))
                    #print(msg.text)

                    encrypted_message_from_blob = pgpy.PGPMessage.from_blob(msg.text)
                    print("verify pubkey")
                    print(pub_key.verify(encrypted_message_from_blob))
                    if pub_key.verify(encrypted_message_from_blob):
                        json_string = priv_key.decrypt(encrypted_message_from_blob).message
                        formdata = json.loads(json_string)
                        print(formdata)
                        print("start pdf generation")
                        gen_pdf(formdata)
                        print("mail generated")
                        send_mail(formdata['authority_mails'])
                        logger.info('mail sent to authority')
                    #mailbox.flag(msg.uid,imap_tools.MailMessageFlags.SEEN, True)
    except Exception as Argument:
        logger.error(Argument)
        print(Argument)

run()