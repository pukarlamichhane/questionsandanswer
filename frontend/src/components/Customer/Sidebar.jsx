import Category from "./Category"
import Colors from "./Colors"


const Sidebar = () => {
  return (
    <div>
        <section className="w-1/6 fixed h-full border-r-2 border-gray-300 z-3 flex flex-col items-center">
        <div className="mb-16">
          <h1 className="mt-5 ">Sneakers store</h1>
        </div>
        <Category />
        <Colors/>
      </section>
    </div>
  )
}

export default Sidebar
