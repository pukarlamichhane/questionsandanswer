/* eslint-disable react/prop-types */


const Button = ({tittle}) => {
  return (
    <button className=" px-5 py-2 mr-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200">{tittle}</button>
  )
}

export default Button
