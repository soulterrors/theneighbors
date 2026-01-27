"use client";

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  itemName: string;
}

export default function AddToCartButton({ itemName }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      aria-label={isAdded ? "Added to cart" : `Add ${itemName} to cart`}
      className={`
        w-full mt-4 text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold
        flex items-center justify-center gap-2 cursor-pointer disabled:cursor-default
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1c1c] focus-visible:ring-offset-2
        transition-all duration-300 ease-out
        ${isAdded
          ? 'bg-[#4a5d4e] scale-100'
          : 'bg-[#1c1c1c] hover:bg-[#4a5d4e] hover:scale-105 active:scale-95'
        }
      `}
    >
      {isAdded ? (
        <>
          <Check size={14} />
          Added
        </>
      ) : (
        <>
          <ShoppingCart size={14} />
          Add to Cart
        </>
      )}
    </button>
  );
}
