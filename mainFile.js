// notes={id,title,description,createdAt,updatedAt}
// essentials
const createNoteBtn=document.querySelector('.create-notes')
const filterNoteIP=document.querySelector('.filter-text')
const dropDEl=document.querySelector('.dropdown1')

// load all notes
let notes=getSavedNotes()

// filter
const filters={
    searchText:'',
    sort:'byRecent'
}

// rendering
renderNotes(notes,filters)


// create notes button click
createNoteBtn.addEventListener('click',()=>{
    const newNote={
        id:uuidv4(),
        title:'',
        description:'',
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    }
    notes.push(newNote)
    saveNotes(notes)
    location.assign(`/fileAdd.html#${newNote.id}`)
})

// filter input
filterNoteIP.addEventListener('input',(e)=>{
    const ip=e.target.value
    filters.searchText=ip
    renderNotes(notes,filters)
})

// dropdown
dropDEl.addEventListener('change',(e)=>{
    filters.sort=e.target.value
    renderNotes(notes,filters)
})



window.addEventListener('storage',(e)=>{
    if(e.key==='notes'){
        notes=getSavedNotes()
        renderNotes(notes,filters)
    }
})


