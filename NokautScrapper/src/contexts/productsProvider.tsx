import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type ProductsProviderProps = {
    children: ReactNode;
}

type ProductsContextData = {
  data: Product[];
  sortedData: Product[];
  setData: Dispatch<SetStateAction<Product[]>>;
  setSortedData: Dispatch<SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextData>({
    data: [],
    sortedData:  [],
    setData: () => { /* do nothing */ },
    setSortedData: () => { /* do nothing */ }
});

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
    const [data, setData] = useState<Product[]>([]);
    const [sortedData, setSortedData] = useState<Product[]>([]);

    return (
        <ProductsContext.Provider value={{
            data,
            sortedData,
            setData,
            setSortedData
        }}>
            {children}
        </ProductsContext.Provider>
    )
}