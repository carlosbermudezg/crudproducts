import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import ProductsForm from './components/ProductsForm'
import ProductsList from './components/ProductsList'

function App() {

  const [products, setProducts] = useState([])
  const [btnValue, setBtnValue] = useState('Crear')
  const [productSelected, setproductSelected] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  //Renderiza los productos la primera vez
  useEffect(() => {
    axios.get('https://products-crud.academlo.tech/products/')
      .then(response => setProducts(response.data) )
      .catch( error => console.log(error) )
  }, [])

  //Obtener los productos de la api
  const getProducts = ()=>{
    axios.get('https://products-crud.academlo.tech/products/')
      .then(response => setProducts(response.data) )
      .catch( error => console.log(error) )
  }

  //Crear un nuevo producto
  const createProduct = (product)=>{
    console.log(product)
    axios.post('https://products-crud.academlo.tech/products/', product)
      .then(() => {
        getProducts()
        setBtnValue('Crear')
        showForm()
        setToastMsg('Producto agregado')
        toast()
      })
      .catch(error => console.log(error))
  }
  //Seleccionar el producto a editar
  const setProductToEdit = (product)=>{
    setproductSelected(product)
    showForm()
    setBtnValue('Editar')
  }
  //Editar un producto
  const editProduct = (product)=>{
    axios.put(`https://products-crud.academlo.tech/products/${product.id}/`, product)
      .then(()=> {
        getProducts()
        setproductSelected(null)
        setBtnValue('Crear')
        showForm()
        setToastMsg('Producto editado')
        toast()
      })
      .catch( error=> console.log(error) )
  }
  //Eliminar un producto
  const deleteProduct = (id)=>{
    axios.delete(`https://products-crud.academlo.tech/products/${id}/`)
      .then(()=> {
        getProducts()
        setproductSelected(null)
        setBtnValue('Crear')
        setToastMsg('Producto eliminado')
        toast()
      } )
      .catch( error => console.log(error) )
  }

  //Mostrar Modal
  const showForm = ()=>{
    document.querySelector('.products__form').classList.toggle('show')
  }
  //reset Form
  const formReset = ()=>{
    setproductSelected(null)
  }

  //Show Toast
  const toast = ()=>{
    document.querySelector('#toast').className = 'toast toast__show'
    setTimeout(()=>{
      document.querySelector('#toast').className = 'toast'
    },2800)
  }

  return (
    <div className="App">
      <ProductsForm 
          createProduct={ createProduct }
          productSelected={ productSelected }
          updateProduct={ editProduct }
          getBtnValue={ btnValue }
      />
      <Navbar showForm={ showForm } formReset={ formReset } setBtnValue={ setBtnValue } />
      <ProductsList 
          products={ products }
          productSelected={ setProductToEdit }
          deleteProduct={ deleteProduct }
      />
      <Toast msg={ toastMsg } />
    </div>
  )
}

export default App
