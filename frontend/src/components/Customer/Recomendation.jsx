import Button from "./Button"


// eslint-disable-next-line react/prop-types
const Recomendation = ({handleClick}) => {
  return (
    <div>
     <h2 className="flex ml-60">Recommended</h2>
      <div className="ml-60 mb-5 mt-5 text-lg">
      <Button onClickHandler={handleClick}  tittle={"All product"}></Button>
      <Button onClickHandler={handleClick}  tittle={"Puma"}></Button>
      <Button onClickHandler={handleClick}  tittle={"Vans"}></Button>
      </div>
    </div>
    
  )
}

export default Recomendation
