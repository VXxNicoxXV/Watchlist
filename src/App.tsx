import { useState } from "react"
import { AddShowForm } from "./components/AddShowForm"
import { ShowRow } from "./components/ShowRow"
import { watchlist as initialWatchList, type Kind, type NewShow, type Show } from "./data/watchlist"
import { cn } from "./utils/cn"

type Filter = "tutti" | Kind

function App() {
  const [nextWatch, setNextWatch] = useState<Show>()
  const [activeFilter, setActiveFilter] = useState<Filter>("tutti")
  const [watchlist, setWatchlist] = useState(initialWatchList);

  function OnShowClick(show: Show) {
    if (nextWatch?.id === show.id) {
      setNextWatch(undefined);
    } else {
      setNextWatch(show)
    }
  }

  function addShow(newShow: NewShow) {
    setWatchlist(prev => [...prev, {
      id: Math.max(0, ...prev.map(show => show.id)) + 1,
      ...newShow
    }])
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-12">
        <h1 className="font-bold text-4xl text-center">La mia watchlist</h1>
        <div className="flex gap-4 mt-4">

          {["tutti", "serie", "film"].map(filtro =>
            <button
              key={filtro}
              className={cn("px-4 py-2 bg-gray-400 rounded-full", {
                "bg-blue-400": activeFilter === filtro
              })
              }
              onClick={() => setActiveFilter(filtro as Filter)}
            >{filtro}</button>)
          }

        </div>

        <div className="w-xl flex flex-col gap-4 py-4">
          {watchlist.filter(show => activeFilter === "tutti" || show.kind === activeFilter).map(show => <ShowRow onClick={() => OnShowClick(show)} show={show} key={show.id}></ShowRow>)}
        </div>

        <p>{watchlist.length} titoli: {watchlist.filter(show => show.kind === "film").length} film e {watchlist.filter(show => show.kind === "serie").length} serie</p>
        {nextWatch && <p className="font-bold">Stasera guardo: <span className="capitalize">{nextWatch.title}</span></p>}

        <AddShowForm existingTitles={watchlist.map(show => show.title)} onAdd={addShow} />
      </div>
    </>
  )
}

export default App