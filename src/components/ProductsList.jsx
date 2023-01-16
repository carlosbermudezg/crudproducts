const ProductsList = ({products, productSelected, deleteProduct})=>{
    
    //Orden de los Productos Alfabeticamente
    products != 0 && products.sort(( a , b) => a.name.localeCompare(b.name))

    return(
        <div className="products__container">
            {
                products?.map((product, index)=>
                        <div className="product__card" key={index}>
                            <h2> { product.name } </h2>
                            <small><b>Category:</b> { product.category } </small>
                            <small><b>Price:</b> { product.price } </small>
                            <small className="available" ><span className="circle" style={ { backgroundColor: product.isAvailable ? '#2dd43b':'red' } }></span> { product.isAvailable ? 'Disponible':'No Disponible' } </small>
                            <div className="buttons">
                                <button className="editBtn" onClick={ ()=> productSelected( product ) } >Editar</button>
                                <button className="deleteBtn" onClick={ ()=> deleteProduct( product.id ) } >Eliminar</button>
                            </div>
                        </div>
                )
            }
            {
                ((products.length === 0) && <span className="no__products">No hay productos creados</span>)
            }
            
        </div>
    )
}
export default ProductsList