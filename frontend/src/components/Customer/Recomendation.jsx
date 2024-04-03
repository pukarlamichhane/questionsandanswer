import Button from "./Button"


const Recomendation = () => {
  return (
    <div>
     <h2 className="flex ml-60">Recommended</h2>
      <div className="ml-60 mb-5 mt-5 text-lg">
      <Button tittle={"All product"}></Button>
      <Button tittle={"Puma"}></Button>
      <Button tittle={"Vans"}></Button>
      </div>
    </div>
    
  )
}

export default Recomendation
