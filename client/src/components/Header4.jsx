import React from 'react';
import leftSVG from '../../public/left-arrow.svg';

const Header4 = () => {
    return (
      <div className=''>
           <section className="flex flex-col border-black border-b-2">
                <div className="flex relative items-center justify-center w-full py-5">
                    <div className="left fixed top-0 left-0">
                        <a href="/home" className="flex items-center">
                            <img src={leftSVG} alt="Left Arrow" className="w-10 h-19" />
                        </a>
                    </div>
                    <div className="w-full max-w-sm mx-auto text-center">
    <p className="font-bold">
        Atencion al<br />
        <span style={{ marginTop: '0px' }}>cliente</span>
    </p>
</div>
                    <img src="/category/rectangle.svg" alt="" className="w-14 absolute z-[-1]" />
                    <img src="/home/rectangle.svg" alt="" className="w-8 absolute left-0 z-[-1]" />
                </div>
            </section>
      </div>
    );
  };

  export default Header4;