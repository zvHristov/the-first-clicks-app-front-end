import React from 'react';

interface SnippetProps {
  
 
}

const Snipped = (props: SnippetProps) => {

    const br = <br />;
    return (<>  
        <p>{`<head>`}</p>
        <p>{`<!-- TheFirstClicks Tracking Code for  https://figma.com -->`}</p>
        <p>{`<script>`}</p>
        <p>{`(function(f.i.r.s.t.c.l.i.c.k.s){`}</p>
        <p>{`h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};`}</p>
        <p>{`h._hjSettings={hjid:'1',hjsv:6};`}</p>
        <p>{`a=o.getElementsByTagName('head')[0];`}</p>
        <p>{`r=o.createElement('script');r.async=1;`}</p>
            <p>{`r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;`}</p>
            <p>{`a.appendChild(r);`}</p>
            <p>{`})(window,document,'https://static.firstclick.app/c/firstclick-','.js?sv=');`}</p>
        <p>{`</script>`}</p>
        <p>{`</head>`}</p>
        </>)
}

export default Snipped;