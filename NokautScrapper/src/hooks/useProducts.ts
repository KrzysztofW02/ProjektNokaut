import { useContext } from "react"
import { ProductsContext } from "../contexts/productsProvider"

export const useProducts = () => {
    return useContext(ProductsContext);
}