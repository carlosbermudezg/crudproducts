const Navbar = ({showForm, formReset, setBtnValue})=>{
    return(
        <nav className="navbar">
            <a onClick={ ()=> {
                showForm()
                formReset()
                setBtnValue("Crear")
            } }>New Product</a>
        </nav>
    )
}
export default Navbar