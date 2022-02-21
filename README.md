# Claimasylum



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/Mareikei/claimasylum.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/Mareikei/claimasylum/-/settings/integrations)

## Collaborate with your team

- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Description
Nach EU-Recht dürfen Menschen auf der Flucht bei ihrer Erstankunft in Europa einen Asylantrag stellen. Erst wenn dieser negativ ausfällt, dürfen diese aus Europa ausgewiesen werden. Die erschreckende Realität ist aber, dass Flüchtende immer wieder illegal und brutal aus europäischem Grenzgebiet vertrieben werden, etwa aus Polen nach Belarus oder aus Griechenland in die Türkei, ohne zuvor einen Asylantrag stellen zu können (Stichwort: Illegal Push-Backs). Mithilfe unserer WebApp können Flüchtende Menschen noch auf der Flucht, direkt nach Betreten europäischen Bodens, einen Asylantrag stellen, und somit ihr Recht auf Asyl wahrnehmen, bevor sie ausgewiesen werden. Dazu werden über ein Formular die nötigen Antragstexte generiert, an die zuständigen Behörden versandt und zusätzlich über das Speichern der Geolocation der eventuell benötigte Nachweis erbracht, dass die Person auch tatsächlich in Europa war.

Das Projekt schafft über diesen konkreten Usecase hinaus ein Framework zum einfachen Abstrahieren formaljuristischer Vorgänge und ermöglicht damit, behördliche Anträge jeglicher Art zu generieren. Dadurch unterwandert diese WebApp die Komplikationen beim Stellen von Anträgen bei Behörden (wie beispielsweise Sprachbarrieren) und erleichtert Menschen, ihre Rechte nicht nur zu kennen, sondern auch wahrzunehmen.


## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

We would love for you to contribute to claimasylum and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Review Guidelines](#code-review-guidelines)

### Issue Reporting Guidelines

Please report all issues in the [issue page](https://gitlab.com/mareikei/claimasylum/issues). There make sure that the bug or feature was not already reported, or please link dublicated cards together.

Write detailed information because it is very helpful to understand an issue. For example:

- How to reproduce the issue, step-by-step.
- The expected behavior.
- What is actually happening (or what is wrong)?
- The operating system.
- Screenshots always help a lot.

### Pull Request Guidelines

The main branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. Do not submit (Pull Requests) PRs against the main branch.
Checkout a topic branch from the develop branch and merge on gitlab.
Overview of Branches:

- main (release branch)
- develop (latest development branch)

**Naming of topic branch**
`[ISSUENUMBER]-[FEATURENAME]`
  example feature branch:
`19-left_navigation_update_on_change`

Explanation:
If the issuenumber is added in the beginning follow by a hyphen it automatically appears in the corresponding gitlab issue. This makes it easier to track branches.

### Code Review Guidelines

When reviewing a merge request it is asked to mark the comments priority. We chose to use emojis to represent the following:

:apple: : "must be fixed"
:orange_book:: "personal taste, but should probably be fixed"
:green_apple: : "style questions, white spaces, etc"

Gitlab text replacements for these emojis:

:apple:  `:apple:`
:orange_book:    `:orange_book:`
:green_apple:    `:green_apple:`

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
