import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  productName: string;
};

const ProductImageGallery = ({
  images,
  selectedIndex,
  onSelect,
  onNext,
  onPrev,
  productName,
}: Props) => {
  return (
    <div
      className="flex flex-col md:flex-row gap-4"
      data-testid="product-gallery"
    >
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${productName}-${index}`}
            className={`w-20 h-20 object-contain cursor-pointer border-2 transition-all shrink-0 ${
              selectedIndex === index ? "border-black" : "border-transparent"
            }`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      {/* Main Image */}
      <div className="relative w-full h-[600px] md:h-[400px] md:h-[500px] sm:h-[400px] md:h-[500px] bg-white">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="object-contain absolute w-full h-full"
        />
        <button
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 z-10 cursor-pointer"
          onClick={onPrev}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 z-10 cursor-pointer"
          onClick={onNext}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
