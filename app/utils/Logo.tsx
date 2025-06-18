import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'default' | 'text-only' | 'icon-only'
  href?: string
  className?: string
  whiteText?: boolean
}

/**
 * Logo Component
 * Centralized logo component using the new-logo.png image
 * 
 * @param {Object} props - Component props
 * @param {"sm" | "md" | "lg" | "xl" | "2xl"} props.size - Size variant of the logo
 * @param {"default" | "text-only" | "icon-only"} props.variant - Display variant
 * @param {string} props.href - Optional link URL
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.whiteText - Optional flag to force white text for ACS
 * @returns {JSX.Element} Logo component with new-logo.png
 */
export function Logo({ 
  size = 'md', 
  variant = 'default', 
  href,
  className = '',
  whiteText = false
}: LogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      image: { width: 24, height: 24 },
      text: 'text-sm',
      container: ''
    },
    md: {
      image: { width: 64, height: 64 },
      text: 'text-lg',
      container: ''
    },
    lg: {
      image: { width: 92, height: 92 },
      text: 'text-xl',
      container: 'gap-1'
    },
    xl: {
      image: { width: 120, height: 120 },
      text: 'text-2xl',
      container: 'gap-2'
    },
    '2xl': {
      image: { width: 150, height: 150 },
      text: 'text-3xl',
      container: 'gap-3'
    }
  }

  const config = sizeConfig[size]

  // Logo content
  const logoContent = (
    <div className={`flex items-center ${config.container} ${className}`}>
      {variant !== 'text-only' && (
        <div className="relative">
          <Image
            src="/new-logo.png"
            alt="ACS Logo"
            width={config.image.width}
            height={config.image.height}
            className="object-contain"
            priority={size === 'lg' || size === 'xl' || size === '2xl'}
          />
        </div>
      )}
      {variant !== 'icon-only' && (
        <span className={`font-bold ${whiteText ? '!text-white' : 'bg-gradient-to-r from-[#0a5a2f] to-[#157a42] bg-clip-text text-transparent'} ${config.text}`}>
          ACS
        </span>
      )}
    </div>
  )

  // Return with or without link wrapper
  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

export default Logo 