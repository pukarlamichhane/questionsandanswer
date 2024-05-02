import { useEffect, Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Ensure this component is implemented
import Productcard from "./Productcard";

// Helper function to normalize text for consistent comparisons
const normalizeText = (text) => text.toLowerCase().trim();

const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");

  const navigate = useNavigate();
  const sortOptions = [
    { name: "Price: Low to High", value: "priceLowToHigh" },
    { name: "Price: High to Low", value: "priceHighToLow" },
  ];

  const subCategories = [
    { name: "Nike" },
    { name: "Adidas" },
    { name: "Puma" },
    { name: "Reebok" },
    { name: "New Balance" },
  ];

  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "beige", label: "Beige" },
        { value: "blue", label: "Blue" },
        { value: "brown", label: "Brown" },
        { value: "green", label: "Green" },
        { value: "purple", label: "Purple" },
      ],
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
  };

  const getSortedProducts = (products) => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case "priceLowToHigh":
        return sortedProducts.sort(
          (a, b) => a.variants[0].price - b.variants[0].price
        );
      case "priceHighToLow":
        return sortedProducts.sort(
          (a, b) => b.variants[0].price - a.variants[0].price
        );
      default:
        return products; // No sort or invalid sort option
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products") // Replace with your endpoint
      .then((response) => {
        // Normalize product data
        const normalizedProducts = response.data.map((product) => ({
          ...product,
          category: normalizeText(product.category),
          color: normalizeText(product.color),
        }));
        setProducts(normalizedProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategory === "" ||
      normalizeText(product.category) === normalizeText(selectedCategory);
    const isColorMatch =
      selectedColors.length === 0 ||
      selectedColors.includes(normalizeText(product.color));
    return isCategoryMatch && isColorMatch;
  });

  const sortedProducts = getSortedProducts(filteredProducts);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="bg-white">
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
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters for Mobile */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <button
                          type="button"
                          className={classNames(
                            "w-full text-left",
                            selectedCategory === category.name
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                          onClick={() => handleCategoryChange(category.name)}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
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
                                    checked={selectedColors.includes(
                                      option.value
                                    )}
                                    onChange={() =>
                                      handleColorChange(option.value)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
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

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-95"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block w-full px-4 py-2 text-left text-sm",
                              sortOption === option.value
                                ? "font-bold text-indigo-600"
                                : "text-gray-600"
                            )}
                            onClick={() => handleSortChange(option.value)}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Product Section */}
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters for Desktop */}
            <div className="hidden lg:block">
              <ul
                role="list"
                className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
              >
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={classNames(
                        "w-full text-left",
                        selectedCategory === category.name
                          ? "text-indigo-600"
                          : "text-gray-900"
                      )}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
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
                        <div className="space-y-4">
                          {section.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${idx}`}
                                type="checkbox"
                                checked={selectedColors.includes(option.value)}
                                onChange={() => handleColorChange(option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-600">
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
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                  {sortedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="mx-4 my-4"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <Productcard
                        image={product.image}
                        name={product.name}
                      ></Productcard>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Product;
