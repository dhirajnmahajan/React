import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateProduct from '../products/create'
import ProductList from '../products/list'

export default function Router (){


    return(
        <BrowserRouter>
        <Routes>
            <Route path='/create' index element={< CreateProduct/>} />
            <Route path='/' element={< ProductList/>} />
        </Routes>
        </BrowserRouter>
    )
}