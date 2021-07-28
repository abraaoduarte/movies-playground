import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

type Movie = {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
	bookmarked: boolean;
	onBookmarked: (movieId: string) => void;
};

const CustomCard: React.FC<Movie> = ({ Poster, Title, Year, Type, bookmarked, onBookmarked, imdbID }) => {
	return (
		<Card>
			<img className="avatar" alt="Movie poster" src={Poster} />

			<CardContent>
				<Typography gutterBottom variant="body2" component="strong">
					{Title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{`Year: ${Year || 'Not informed'}`}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{`Type: ${Type || 'Not informed'}`}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" onClick={() => onBookmarked(imdbID)}>
					<FavoriteIcon color={bookmarked ? 'secondary' : 'primary'} />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default CustomCard;
