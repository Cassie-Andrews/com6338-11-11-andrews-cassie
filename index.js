const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = (poetryResponse) => {
    console.log(poetryResponse);
    
    const lines = poetryResponse[0].lines;
        
    // display poem title
    const titleHTML = makeTag('h2')(poetryResponse[0].title);
    
    // display 'by: author' as an em el inside of an h3 el
    const authorHTML = makeTag('h3')(makeTag('em')('by ' + poetryResponse[0].author));

    // use empty string "" to group stanzas
    const stanzasHTML = lines
        .reduce((stanzas, line) => {
            if (line === "") { // if line is an empty string
            stanzas.push([]); // end stanza
        } else {
            stanzas[stanzas.length - 1].push(line);// add to last stanza or create new stanza
        }
        return stanzas;
    }, [[]]) // start empty stanza
    .map(stanza => makeTag('p')(stanza.join('<br>')))// display each stanza as paragraph elements, join lines with br elements
    .join(''); // join stanzas to one string 

    // makePoemHTML should output a single string of HTML
    return titleHTML + authorHTML + stanzasHTML ;
}


// FETCH POEM DATA
// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}


// After clicking the "Get Poem" button, the application should make a call to https://poetrydb.org/random,linecount/1;12/author,title,lines.json

// The app should then take this response and render it inside of the #poem element

// Subsequent clicks of the "Get Poem" button should clear the markup in the #poem element before rendering new poem markup.

// Note: You must use makeTag and pipe at least once in your solution
// You may also make as many additional helper functions as you wish within your code.





// TIPS
// the split, join, and map functions can make short work of separating the poem into stanzas and inserting linebreaks between the lines inside of stanzas. 
// Pay extra attention to how the lines property includes "" to separate stanzas and how that should look as HTML in the final app