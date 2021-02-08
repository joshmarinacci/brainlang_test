import {useEffect, useRef} from 'react'

export class CanvasResult {
    constructor(cb) {
        this.cb = cb
    }
}

export const is_canvas_result = (val) => val instanceof CanvasResult


export function CanvasView({result}) {
    let ref = useRef()
    useEffect(() => {
        if (ref.current) {
            result.cb(ref.current)
        }
    })
    return <canvas width={600} height={300} ref={ref}/>
}
