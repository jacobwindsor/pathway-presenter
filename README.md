# Pathway Presenter
[![Build Status](https://travis-ci.org/jacobwindsor/pathway-presenter.svg?branch=master)](https://travis-ci.org/jacobwindsor/pathway-presenter)

Create presentations of [WikiPathways](http://wikipathways.org) pathway diagrams! Demo currently live at [pathwaypresenter.jcbwndsr.com](http://pathwaypresenter.jcbwndsr.com)
and is tracking the master branch.

This is part of my Google Summer of Code (GSoC) project for the National Resource for Network Biology (NRNB).
You can follow my [blog posts](http://jcbwndsr.com/tag/google-summer-of-code/) for it and [read the proposal on Figshare](https://figshare.com/articles/Proposal_WikiPathways_Pathway_Presenter/5027885).
I also made a webinar version of the proposal [here](https://goo.gl/LPelu0).

**Pull requests welcome!**

## Developer guide
This guide serves to aid developers wishing to work on the Pathway Presenter.

## Yarn
Please consider using [Yarn](yarnpkg.com) over npm when working on this project (and any others ;).

## Create React App
This project uses [Create React App](https://github.com/facebookincubator/create-react-app)(CRP) to handle building, dev server and other boilerplate tasks.

### Project Structure.
The project structure follows the same style as outlined in [this blog post](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).
Please read that blog post before going any further.

Briefly, the structure is as follows.

- build (from CRP)
- node_modules
- public (from CRP)
- src
    - assets (static files. e.g. svg)
    - components (every component given its own directory)
        - Editor (see Editor vs. Viewer)
        - Viewer (see Editor vs. Viewer)
        - ...
    - data (refer to blog post)
    - utils
    - App.js (only for dev server. See Editor vs. Viewer)
    - ...
- .env (see .env.example and create .env with own credentials)
- ...

## Editor vs. Viewer
The Pathway Presenter has two main entry components, Editor and Viewer. 
The Editor provides the editing and creation interface for pathway presentations. The Viewer provides the read-only
"present" mode for presentations. 

These two components are the ones that would be used on integration with any platform (e.g. WikiPathways). The `App.js` 
file is only used for direct usage of the Pathway Presenter for testing (e.g. on local). It simply renders the Editor
 or Viewer component depending on the lack or presence of a "present" url parameter.
 
## Unit testing
[Jest](https://facebook.github.io/jest/) is used for unit testing and snapshot testing. Thorough unit tests are required
for every component.

Run ``yarn test`` to run the test runner.

## end-to-end tests.
To date, there are no hard coded end-to-end tests. However, every new feature needs to be tested against a variety of browsers.
You can use [BrowserStack](browserstack.com) for this. 

These are the browsers we support:

- Upwards of IE11
- IE10
- Upwards of Edge 15
- Edge 14
- Upwards of Chrome 60``
- Chrome 55
- Upwards of FF55
- FF46
- Upwards of Safari 10.1

## Pvjs
Pvjs is the library used to render the pathway diagrams. You will likely need to work on this as well as the Pathway Presenter.
Please refer to the [Pvjs Github repo](https://github.com/wikipathways/pvjs) for more information.

## Environment variables
There is a .env file that is used to provide things like API keys to any scripts that might need it. You should copy `.env.example` to `.env` and change the key name pairs to match your values. 
Under no circumstances should you push the filled in .env file to the public Github repo. This contains *sensitive* information.

## Questions
If you have any questions you can email me (Jacob Windsor) at [me@jcbwndsr.com](mailto:me@jcbwndsr.com).