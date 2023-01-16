import { useForm } from "react-hook-form"
import { useEffect } from "react";

const ProductsForm = ({productSelected, createProduct, updateProduct, getBtnValue})=>{

    useEffect(() => {
      productSelected ? reset(productSelected) : resetForm()
    }, [productSelected])
    
    //Resetear el formulario en blanco
    const resetForm = ()=>{
        reset({
            name:"",
            category:"",
            price:"",
            isAvailable: false
        })
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const onProductSubmit = (product)=>{
        productSelected ? (updateProduct(product), resetForm()) : (createProduct(product), resetForm())
    }

    const showForm = ()=>{
        document.querySelector('.products__form').classList.toggle('show')
    }

    return(
        <div className="products__form" onClick={ ()=>showForm() }>
            <div className="form__container" onClick={(e)=> e.stopPropagation()}>
                <form onSubmit={ handleSubmit(onProductSubmit) }>
                    <label htmlFor="name">Product Name:</label>
                        <div className="input" style={ errors.name && {border: '1px solid rgb(255, 74, 74)'} }>
                            <input id="name" {...register("name", { required: true })} placeholder="Product Name" />
                        </div>
                    <label htmlFor="category">Category:</label>
                        <div className="input" style={ errors.name && {border: '1px solid rgb(255, 74, 74)'} }>
                            <input id="category" {...register("category", { required: true })} placeholder="Category" />
                        </div>
                    <label htmlFor="price">Price:</label>
                        <div className="input" style={ errors.name && {border: '1px solid rgb(255, 74, 74)'} }>
                            <input id="price" type="number" {...register("price", { required: true })} placeholder="Price" />
                        </div>
                    <label htmlFor="isAvailable">Available:</label>
                        <div className="checkbox">
                            <label className="switch">
                                <input id="isAvailable" className="isAvailable" type="checkbox" {...register("isAvailable")} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    <input className="btn" type="submit" value={ getBtnValue } />
                </form>
            </div>
        </div>
    )
}
export default ProductsForm