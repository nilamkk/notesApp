// essentials
const rendEl=document.querySelector('.render-div')

// load all notes
const getSavedNotes=()=>{
    const items=localStorage.getItem('notes')
    if(items===null)
        return []
    return JSON.parse(items)
}
// save notes
const saveNotes=(notes)=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}
// remove notes
const removeNotes=(id)=>{
    const index=notes.findIndex((note)=>{
        return note.id===id
    })
    if(index>-1){
        notes.splice(index,1)
        saveNotes(notes)
        renderNotes(notes,filters)
    }
    
}

// sort
const sortNotes=(items)=>{
    if(filters.sort==='byLastEdited'){
        items.sort((a,b)=>{
            if(a.updatedAt<b.updatedAt)
                return 1
            else if(a.updatedAt>b.updatedAt)
                return -1
            else
                return 0
        })
    }else if(filters.sort==='byAlpha'){
        items.sort((a,b)=>{
            if(a.title.toLowerCase()<b.title.toLowerCase())
                return -1
            else if(a.title.toLowerCase()>b.title.toLowerCase())
                return 1
            else
                return 0
        })
    }else if(filters.sort==='byRecent'){
        items.sort((a,b)=>{
            if(a.createdAt<b.createdAt)
                return 1
            else if(a.createdAt>b.createdAt)
                return -1
            else
                return 0
        })
    }
    return items

}


// render notes
const renderNotes=(notes,filters)=>{
    rendEl.innerHTML=''
    
    // filter by search items
    let itemsToRender=notes.filter(note => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    itemsToRender=sortNotes(itemsToRender)
    
    
    // Render items
    itemsToRender.forEach((note)=>{
        // div button name
        const divEl1=document.createElement('div')
        const buttonEl1=document.createElement('button')
        const nameEl1=document.createElement('a')
        // set
        buttonEl1.textContent="remove"
        nameEl1.textContent=note.title
        nameEl1.setAttribute('href',`/fileAdd.html#${note.id}`)

        // btn event listener
        buttonEl1.addEventListener('click',()=>{
            removeNotes(note.id)
        })

        // render
        divEl1.appendChild(nameEl1)
        divEl1.appendChild(buttonEl1)
        rendEl.appendChild(divEl1)
    })
}

window.addEventListener('storage',(e)=>{
    if(e.key==='notes'){
        notes=getSavedNotes()
        renderNotes(notes,filters)
    }
})




