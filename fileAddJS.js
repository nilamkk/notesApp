// requirements
const Title=document.querySelector('.text-area-title')
const Body=document.querySelector('.text-area')
const id=location.hash.substring(1)
const lastEd=document.querySelector('.last-edited')
const clearBt=document.querySelector('.clear-all')

// find note to edit
let notes=getSavedNotes()
const note=notes.find((ele)=>{
    return ele.id===id 
})


// load initial value
Title.value=note.title
Body.value=note.description
lastEd.textContent=`Last Edited ${moment(note.updatedAt).fromNow() }`


// title change-> save in title and load 
Title.addEventListener('input',(e)=>{
    const title=e.target.value
    note.title=title
    note.updatedAt=moment().valueOf()
    saveNotes(notes)
})

Body.addEventListener('input',(e)=>{
    const description=e.target.value
    note.description=description
    note.updatedAt=moment().valueOf()
    lastEd.textContent=`Last Edited ${moment(note.updatedAt).fromNow() }`
    saveNotes(notes)
})

clearBt.addEventListener('click',()=>{
    Title.value=''
    Body.value=''
})



