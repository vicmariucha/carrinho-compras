import {Row, Col} from 'react-bootstrap';
import { produtosArray } from '../produtosLoja';
import ProdutoCard from '../components/produtoCard';
// [{...}, {...}, {...}]

function Loja(){
    return(
        <>
            <h1 align="center" className="p-3">Bem vindo à Loja!</h1>
            <Row xs={1} md={3} className="g-4">
                {produtosArray.map((produto, idx) => (
                    <Col align="center" key={idx}>
                        <ProdutoCard produto={produto}/>
                    </Col>
                ))}
            </Row>
        </>
        
    )
}
 
export default Loja;