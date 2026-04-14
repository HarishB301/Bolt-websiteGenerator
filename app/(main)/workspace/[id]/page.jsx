import ChatView from "@/components/custom/ChatView"
import CodeView from "@/components/custom/CodeView"

const workspace = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7">
        <ChatView/>
        <div className="col-span-2">
             <CodeView/>
        </div>
      </div>
    </div>
  )
}

export default workspace
