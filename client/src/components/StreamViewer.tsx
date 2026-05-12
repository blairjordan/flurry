interface StreamViewerProps {
  uid: string
}

const StreamViewer: React.FC<StreamViewerProps> = ({ uid }) => {
  return (
    <div className="relative pt-[56.25%]">
      <iframe
        src={`${import.meta.env.VITE_CLOUDFLARE_CUSTOMER_SUBDOMAIN}/${uid}/iframe`}
        className="absolute left-0 top-0 h-full w-full border-none"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default StreamViewer
