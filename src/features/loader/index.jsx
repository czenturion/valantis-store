import React from 'react'
import s from "./loader.module.css"

export function Loader(props) {
    return (<div className={s.loader}><svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 24 24" {...props}><circle cx={18} cy={12} r={0} fill="black"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={12} r={0} fill="black"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={6} cy={12} r={0} fill="black"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg></div>);
}
