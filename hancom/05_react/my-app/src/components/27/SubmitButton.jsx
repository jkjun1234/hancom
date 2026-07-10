// MUI 라이브러리를 사용한 버튼 구현

import {Button, TextField, Typography, Alert, Card, Box} from '@mui/material'

const SubmitButton = () => {
    return (
        <>
        <TextField placeholder='입력란'>입력</TextField>
        <Typography>표시</Typography>
        <Alert>피드백</Alert>
        <Card>카드</Card>
        <Box>박스</Box>
        <Button variant='contained' onClick={() => alert("눌러줘서 감사함다")
        }>눌러보시오 </Button>
        </>
    )
}

export default SubmitButton