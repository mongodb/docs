import Script from 'next/script';

const Analytics = () => {
  const pathwayScript = `
  !function(e,n){
    var t=document.createElement("script"),
        o=null,
        x="pathway";
    t.async=!0,
    t.src='https://'+x+'.mongodb.com/'+(e?x+'-debug.js':''),
    document.head.append(t),
    t.addEventListener("load",function(){
      o=window.pathway.default,
      (n&&o.configure(n)),
      o.createProfile("mongodbcom").load(),
      window.segment=o
    })
      }();`;

  return (
    <Script
      id="pathway-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: pathwayScript,
      }}
    />
  );
};

export default Analytics;
