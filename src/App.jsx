import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [spells, setSpells] = useState([]);
  const [query, setQuery] = useState('');
  const [selectSpell ,setSelectSpell] = useState({});

  function handleSelectSpell(spellObject){
    setSelectSpell(spellObject)
  }

  function handleCloseSpell(){
    setSelectSpell({})
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://hp-api.onrender.com/api/spells')
        const data = await res.json()
        console.log(data)
        setSpells(data)
      }
      catch (e) {
        console.log(e)
      }
    }

    fetchData()

  }, [])

  return (
    <>
      <div className="main-container">
        <Navbar>
          <Search query={query} setQuery={setQuery} />
        </Navbar>
        <SpellList spells={spells} query={query} onSelectSpell={handleSelectSpell}/>
        {Object.keys(selectSpell).length > 0 && <SpellCard selectSpell={selectSpell} onClose={handleCloseSpell}/>}
      </div>
    </>

  )
}

export default App


function Navbar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  )
}


function Logo() {
  return (
    <div className="logo">
      <span role='img'>🪄</span>
      <h1>Wizard~Verse</h1>
    </div>
  )

}

function Search({ query, setQuery }) {


  return (
    <input type="text"
      placeholder='Search Spell'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}


function SpellList({ spells, query , onSelectSpell}) {
  return (
    <>
      <div className="spell-container">
        {query.length > 0 ? (
          <ul>

            {spells.filter((spell) => {

              return spell.name.toLowerCase().includes(query.toLowerCase())
            }).map((spell) => {
              return (
                <div className='spell-tag' key={spell.id} onClick={()=>onSelectSpell(spell)} >{spell.name}</div>
              )
            })
            }
          </ul>) : (
            <ul>
              {
                spells.map((spell) => {
                  return (
                    <div className='spell-tag' key={spell.id} onClick={()=>onSelectSpell(spell)}>
                      {/* <span role='img'><img src="https://media.istockphoto.com/id/502896185/photo/spell-book.jpg?s=2048x2048&w=is&k=20&c=LivteyTsB3M25KRegjXOEtOckAQNo4VHREdqco7Njck=" alt="" srcset="" /></span> */}
                      <span>{spell.name}</span>
                    </div>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    </>
  )
}


function SpellCard({ selectSpell, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* <img src={item.image} alt="Item" /> */}
        <p>{selectSpell.name}</p>
        <p>{selectSpell.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}