import {ProjectFakerForm} from "./project/migrationAndFaker";

export function html(title: string, body: string, message?: { type: string, content: string } | null) {
    // console.log('body : ', body)
    return '' +
        '\n<html lang="en">' +
        '\n   <head>' +
        '\n       <meta charset="utf-8"><meta name="author" lang="fr" content="Housni BOUDAOUD"/>' +
        '\n       <meta name="robots" content="projects, Housni, BOUDAOUD, hboudaoud, projects-boudaoud, projects-hboudaoud"/>' +
        '\n       <META HTTP-EQUIV="Pragma" CONTENT="cache"/>' +
        '\n       <meta name="viewport" content="width=device-width"/>' +
        '\n       <meta name="viewport" content="width=device-height"/>' +
        '\n       <meta name="viewport" content="width=device-width, initial-scale=0.9">' +
        '\n       <title>' + title + ': Project Housni BOUDAOUD</title>' +
        '\n       <link rel="preconnect" href="https://fonts.gstatic.com">\n' +
        '\n       <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"> ' +
        '\n       <style>' +
        '\n             @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@600&display=swap");' +
        // '               @import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");' +
        '\n       </style>'+
        '\n       <link rel="stylesheet" href="/asset/css/style.css"/>' +
        '\n   </head>' +
        '\n   <body>' +
        '\n        <header>' +
        '\n             <nav>' +
        '\n                 <ul>' +
        '\n                 <li><a href="/">Home</a></li>' +
        '\n                 <li><a href="/about">About</a></li>' +
        '\n                 <li  class="dropdown">' +
        '\n                         <a href="javascript:void(0)" class="dropbtn">Projects</a>' +
        '                           <div class="dropdown-content">' +
        '                               <a href="/project">All</a>' +
        '                               <a href="/project/new">New</a>' +
        '                           </div>' +
        '\n                     </li>' +
        '\n                 </ul>' +
        '\n             </nav>' +
        '\n             <h1>' + title + '</h1>' +
        '\n         </header>' +
        '\n         <section class="container">' +
        (message ? '\n      <div class="' + message.type + '">' + message.content + '</div>' : '') +
        '\n             <section>' +
        '\n                 <div>' +
        '\n                     ' + body +
        '\n                 </div>' +
        '\n            </section>' +
        '\n         </section>' +
        '\n         <footer>' +
        `\n          <div>${ProjectFakerForm('initialize project and generate fake data')}</div>`+
        '\n         </footer>' +
        '\n   </body>' +
        '\n</html>'
        ;
}
