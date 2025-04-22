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
    <div className="flex gap-4" data-testid="product-gallery">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${productName}-${index}`}
            className={`w-20 h-20 object-contain cursor-pointer border-2 transition-all ${
              selectedIndex === index ? "border-black" : "border-transparent"
            }`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <div className="flex-1 relative h-[600px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-white ">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="object-contain absolute inset-0 h-[600px] md:h-[400px] lg:h-[500px] w-full"
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
