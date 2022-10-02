import masterList from './masterList';
import freshStart from './freshStart';
import resume from './resume';

if (!localStorage.getItem('oldData')) {
  freshStart();
  localStorage.setItem('instance', masterList);
  localStorage.setItem('oldData', JSON.stringify(masterList.data));
  localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
} else {
  resume();
}
