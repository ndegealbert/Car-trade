import { GetStaticProps } from "next"
import { openDB } from "./openDb";
import { FaqModel } from "./api/Faq";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));



//Create Interface of fAQ question
interface faqProps {
    faq:FaqModel[]

}
export  default  function FAQ({faq}:faqProps) {
    const classes = useStyles();
    return <div>
        {faq.map(f =>(
        <div className={classes.root}>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography className={classes.heading}>{f.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
                    {f.answer}
            </Typography>
        </AccordionDetails>
        </Accordion>
        </div>

 ))}

            </div>

}

export  const  getStaticProps:GetStaticProps =  async () => {
    const db = await openDB()
    const faq = await db.all('SELECT * FROM FAQ ORDER BY createDate DESC');
  

     return {props:{ faq }}
}