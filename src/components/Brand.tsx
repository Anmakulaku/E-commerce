import './Brand.css'
import chanel from '../img/chanel.png'
import lv from '../img/lv.png'
import prada from '../img/prada.png'
import ck from '../img/ck.png'
import denim from '../img/denim.png'

export function Brand() {

        return(
                <div className='brand'>
                        <div>
                                <img src={chanel} alt='Chanel' className='brand__img1'/> 
                        </div>
                        <div>
                                <img src={lv} alt='Louis Vuitton' className='brand__img2'/> 
                        </div>
                        <div>
                                <img src={prada} alt='Prada' className='brand__img3'/> 
                        </div>
                        <div>
                                <img src={ck} alt='Calvin Klein' className='brand__img4'/> 
                        </div>
                        <div>
                                <img src={denim} alt='Denim' className='brand__img5'/> 
                        </div>
                </div>
        )
}