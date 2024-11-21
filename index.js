const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

// helper function #2
    // Pipe is a standard feature of many functional programming libraries that allows the programmer to chain function calls together while passing the output from one function into the input of another
const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

// helper function #1
const makeTag = tag => str => `<${tag}>${str}</${tag}>`
    // This function is curried to take the tag name as an argument, and then return a function that takes its argument and nests it with the tag. 
    // This function can be used in various ways to create html elements for makePoemHTML. Here are some usage examples of makeTag:

// !!!complete this function!!
const makePoemHTML = (poemData) => {
// makePoemHTML will accept PoetryDB API's response and should output a single string of html. 
    const title = poemData[0].title;
    const author = poemData[0].author;
    const lines = poemData[0].lines;

    // This string should consist of:
    // an h2 element containing the title of the poem
    const titleHTML = makeTag('h2')(title);
    // an em element containing "by " and the author's name that is itself inside of an h3 element
    const authorHTML = makeTag('h3')(
        makeTag('em')('by ' + author)
    );
    // and then paragraph elements for each stanza of the poem that contain lines separated by linebreak tags.
    // !!! for each -> use map
    const stanzasHTML = makeTag('')();
        // Note that the last line in each paragraph tag does NOT contain a linebreak element after it.


    return titleHTML + authorHTML + stanzasHTML;

}



// FETCH POEM DATA
// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))

  const poemData = await getJSON(poemURL);
  console.log(poemData)
}


// After clicking the "Get Poem" button, the application should make a call to https://poetrydb.org/random,linecount/1;12/author,title,lines.json

// The app should then take this response and render it inside of the #poem element

// Subsequent clicks of the "Get Poem" button should clear the markup in the #poem element before rendering new poem markup.

// Note: You must use makeTag and pipe at least once in your solution
// You may also make as many additional helper functions as you wish within your code.





// TIPS
// the split, join, and map functions can make short work of separating the poem into stanzas and inserting linebreaks between the lines inside of stanzas. 
// Pay extra attention to how the lines property includes "" to separate stanzas and how that should look as HTML in the final app