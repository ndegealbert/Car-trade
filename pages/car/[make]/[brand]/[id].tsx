import { GetServerSideProps } from "next"
import { openDB } from "../../../openDb"
import { CarModel } from "../../../api/Car"

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    image: {
      width: '100%'      
    },
    
    img: {
       
        maxWidth: '100%',
        maxHeight: '100%',
      },
  }));


interface CarDetailsprops{ 
    car:CarModel | undefined | null 
    
}
export default function  CarDetails({car}:CarDetailsprops){
    const classes = useStyles();
    if(!car){
        return <h1>Car  not found</h1>
    }

    return <div>  
        <Paper className={classes.paper}>
        <Grid container  spacing={2}>
          <Grid  xs={12} sm={6} md={5} >
              <img className="img" src={car.photoUrl} />   
          </Grid>

          <Grid item xs={12}  sm={6} md={7} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs >
                <Typography gutterBottom variant="h5">
                 Maker: {car.make + ' ' +  car.model }  
                </Typography>
                <Typography gutterBottom variant="body2" >
                 Price {car.price} ksh
                </Typography>
                <Typography  gutterBottom variant="body2" color="textSecondary">
                 Year:{car.year}
                </Typography>

                <Typography gutterBottom variant="body2" color="textSecondary">
                 Kilometer:{car.kilometers}
                </Typography>

                <Typography gutterBottom variant="body2" color="textSecondary">
                 FuelType:{car.fuelType}
                </Typography>


                <Typography gutterBottom variant="body2" color="textSecondary">
                Details:{car.details}
                </Typography>

              </Grid>
              
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </Grid>
      </Paper>       
        </div>
    

}

export  const getServerSideProps:GetServerSideProps = async ( ctx)=>{
    const  id = ctx.params.id
    const  db =  await openDB()
    const car =  await db.get('select * from Car where id = ?', +id);
    
    return {props:{ car:car || null }}

}