// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const CardStatWithImage = props => {
  // Props
  const { title, src, stats, trendNumber, trend, chipText, chipColor } = props

  return (
    <Card className='relative overflow-visible mbs-12'>
      <CardContent>
        <Typography color='text.primary' className='font-semibold'>
          {title}
        </Typography>
        <div className='flex items-center gap-2 pbs-4 pbe-1.5 is-1/2 flex-wrap'>
          <Typography className='ml-2' variant='h2'>{stats}</Typography>
          <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
            {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
          </Typography>
        </div>
        <Chip label={chipText} color={chipColor} variant='tonal' size='normal' />
        <img src={src} alt={title} className='absolute block-end-0 inline-end-4 w-36' />
      </CardContent>
    </Card>
  )
}

export default CardStatWithImage
