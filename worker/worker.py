import pgpy
import imap_tools
import os
import json
from imap_tools import MailBox, AND
from fpdf import FPDF
# Get date, subject and body len of all emails from INBOX folder

pub_key, _ = pgpy.PGPKey.from_file(str( '/code/publickeys/server.asc'))
priv_key, _ = pgpy.PGPKey.from_file(str('/code/privatekeys/worker.pgp'))

print('worker started')

def gen_pdf(formdata):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    i = 1
    cellheight = 30
    for key in formdata:
        print(key,i)
        pdf.cell(200, 30, txt=key+' : '+str(formdata[key]), ln=1)
        i += 1
    pdf.output("/code/pdfs/simple_demo.pdf")

def send_mail():
    import smtplib
    from email.message import EmailMessage

    email_address = os.environ.get('EMAIL_FROM_MAIL')

    # create email
    msg = EmailMessage()
    msg['Subject'] = "Email subject"
    msg['From'] = email_address
    msg['To'] = os.environ.get('CLAIMASYLUM_NOTIFICATION_MAIL')
    msg.set_content("New asylum request:")

    #add pdf attachment
    with open("/code/pdfs/simple_demo.pdf", 'rb') as f:
        file_data = f.read()
        msg.add_attachment(file_data, maintype="application", subtype="pdf", filename='asylum.pdf')

    # send email
    with smtplib.SMTP_SSL(os.environ.get('EMAIL_HOST'), 465) as smtp:
        smtp.login(os.environ.get('EMAIL_HOST_USER'), os.environ.get('EMAIL_HOST_PASSWORD'))
        smtp.send_message(msg)


with MailBox(os.environ.get('EMAIL_HOST')).login(os.environ.get('EMAIL_HOST_USER'), os.environ.get('EMAIL_HOST_PASSWORD')) as mailbox:
    for msg in mailbox.fetch(mark_seen=False):
        if '\\Seen' not in msg.flags:

            print(msg.flags)
            print(msg.date, msg.subject, len(msg.text or msg.html))
            print(msg.text)


            encrypted_message_from_blob = pgpy.PGPMessage.from_blob(msg.text)
            print(pub_key.verify(encrypted_message_from_blob))
            if pub_key.verify(encrypted_message_from_blob):
                json_string = priv_key.decrypt(encrypted_message_from_blob).message
                print(json_string)
                formdata = json.loads(json_string)
                gen_pdf(formdata)
                send_mail()
                for key in formdata:
                    print(key)
            #mailbox.flag(msg.uid,imap_tools.MailMessageFlags.SEEN, True)

