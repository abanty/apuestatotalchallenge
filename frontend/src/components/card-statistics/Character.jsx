// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'

const CardStatWithImage = props => {
  // Props
  const { title, src, srcExra, stats, trendNumber, trend, chipText, chipColor } = props

  return (
    <Card className='relative overflow-visible mbs-12'>
      <CardContent>
        <Typography color='text.primary' className='font-semibold'>
          {title}
        </Typography>
        <div className='flex items-center gap-2 pbs-6 pbe-1.5 is-1/2 flex-wrap'>
          <Typography className='ml-2 pb-2' variant='h2'>
            {stats}
          </Typography>
          <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
            {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
          </Typography>
        </div>
        <div className='flex items-center gap-2.5'>
          <Typography variant='overline'>{chipText}</Typography>
          <img src={srcExra} width={40} className='mb-2' />
        </div>
        <img src={src} alt={title} className='absolute block-end-12 inline-end-5 w-28 pb-2' />
      </CardContent>
    </Card>
  )
}

export default CardStatWithImage
