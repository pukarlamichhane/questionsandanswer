import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Transition, Dialog, Disclosure, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Productcard from "./Productcard";
import { useNavigate } from "react-router-dom";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { label: "Category 1", value: "cat1" },
      { label: "Category 2", value: "cat2" },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    options: [
      { label: "$0-$50", value: "0-50" },
      { label: "$51-$100", value: "51-100" },
    ],
  },
];

const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the URL
    axios
      .get("http://localhost:8000/api/products") // Replace with your actual URL
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      });
  }, []);
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  }; // Empty dependency array ensures this only runs once on component mount

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={() => setMobileFiltersOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure key={section.id}>
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, idx) => (
                                <div key={idx} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${idx}`}
                                    type="checkbox"
                                    value={option.value}
                                    defaultChecked={false}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${idx}`}
                                    className="ml-3 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Product
          </h1>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </Menu>
        </div>

        {/* Product grid */}
        <div className="flex flex-wrap justify-center bg-white py-5">
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer mx-4 my-4"
                onClick={() => handleProductClick(product._id)}
              >
                <Productcard image={product.image} name={product.name} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Product;
