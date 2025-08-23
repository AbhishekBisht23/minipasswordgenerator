import { useState ,useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength]= useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password , setpassword] = useState("");
  const passref = useRef(null);
  const generatepassword = useCallback(()=>
  {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str +="1234567890";
    if(charAllowed) str+="!@#$%^&*<~_-+=|";

    for(let i=1;i<=length;i++)
    {
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);
    }
    console.log(pass);
    setpassword(pass);
  },[length,charAllowed,numberAllowed,setLength])
  
  const copytoclipboard = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{generatepassword()},[length,charAllowed,numberAllowed,generatepassword])

  return (
    <>
    <div className='w-dvw h-dvh bg-black flex justify-center items-center'>
      <div className='w-220 bg-gray-600 h-45 rounded-4xl flex flex-col justify-center items-center'>
        <div>
          <input ref={passref} className='bg-white w-150 h-15 text-3xl text-orange-400 ' type="text" placeholder='Password' readOnly value={password}/>
          <button onClick={copytoclipboard} className='bg-blue-800 text-white h-15 w-40 text-2xl'>copy</button>
        </div>
        <div className='flex gap-5'>
          <input type="range"  min={5} max={50} onChange={(e)=>{setLength(e.target.value)}}/>
          <label className='text-orange-500 text-2xl'>Length: ({length})</label>
          <input type="checkbox" id='numcheckbox' onChange={()=>setnumberAllowed((prev)=> !prev)} />
          <label className='text-orange-500 text-2xl' htmlFor="numcheckbox">Numbers</label>
          <input type="checkbox" id='charcheckbox'onChange={()=>setcharAllowed((prev)=>!prev)}/>
          <label htmlFor="charcheckbox" className='text-orange-500 text-2xl'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
