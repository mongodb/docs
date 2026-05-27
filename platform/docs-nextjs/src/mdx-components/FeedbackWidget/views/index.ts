import Loadable from '@loadable/component';
import SubmittedView from './submitted-view';
import RatingView from './rating-view';
const CommentView = Loadable(() => import('./comment-view'));

export { CommentView, RatingView, SubmittedView };
