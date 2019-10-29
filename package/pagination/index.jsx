import React from 'react';
import { view as IconButton } from '../buttons/iconButton';
import createComponent from 'rce-pattern/createComponent';
// import range from 'lodash/range';
// import floor from 'lodash/floor';
// import min from 'lodash/min';
import MdFirstPage from 'react-icons/lib/md/first-page';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MdLastPage from 'react-icons/lib/md/last-page';
import './index.scss';

const name = 'pagination';

const init = () => {};

// let isEven = function(num) {
//   return parseInt(num / 2, 10) * 2 === num;
// };

// showCount 是偶数时，需要对 before 向下取整
// let showCurrentBefore = function(props, count) {
//   let {
//     currentPage,
//     showCount,
//     requestChangePage
//   } = props;

//   return range(currentPage - count, currentPage).map(function(item, index) {
//     if ( isEven(showCount) ) item = floor(item);

//     return (
//       <IconButton
//         key={index}
//         onClick={() => requestChangePage(item)}
//         className="pagination_indicator_before_item"
//       >
//         {item}
//       </IconButton>
//     );
//   });
// };

// let showCurrentAfter = function(props, count) {
//   let {
//     currentPage,
//     requestChangePage
//   } = props;

//   return range(currentPage + 1, currentPage + count + 1).map(function(item, index) {
//     return (
//       <IconButton
//         key={index}
//         onClick={() => requestChangePage(item)}
//         className="pagination_indicator_after_item"
//       >
//         {item}
//       </IconButton>
//     );
//   });
// };

// let showSurround = function(props) {
//   let {
//     currentPage,
//     showCount,
//     pageCount
//   } = props;

//   let surround = (showCount - 1) / 2;
//   let availableBefore = currentPage - 1;
//   let availableAfter = pageCount - currentPage;
//   let remain, before, after;

//   if (availableBefore >= surround && availableAfter >= surround) {
//     before = showCurrentBefore(surround);
//     after = showCurrentAfter(surround);

//   } else {
//     if (availableBefore < availableAfter) {
//       remain = surround - availableBefore;
//       before = showCurrentBefore(availableBefore);
//       after = showCurrentAfter( min([availableAfter, surround + remain]) );

//     } else {
//       remain = surround - availableAfter;
//       before = showCurrentBefore( min([availableBefore, surround + remain]) );
//       after = showCurrentAfter(availableAfter);
//     }
//   }

//   return { before, after };
// };

const FirstPageBtn = createComponent({
  name: 'FirstPageBtn',
  view({ parentProps: { currentPage, requestFirstPage } }) {
    return (
      <IconButton
        icon={MdFirstPage}
        disabled={currentPage === 1}
        onClick={requestFirstPage}
      />
    );
  }
});

const PrevPageBtn = createComponent({
  name: 'PrevPageBtn',
  view({ parentProps: { currentPage, requestPrevPage } }) {
    return (
      <IconButton
        icon={MdChevronLeft}
        disabled={currentPage === 1}
        onClick={requestPrevPage}
      />
    );
  }
});

const NextPageBtn = createComponent({
  name: 'NextPageBtn',
  view({ parentProps: { currentPage, pageCount, requestNextPage } }) {
    return (
      <IconButton
        icon={MdChevronRight}
        disabled={currentPage === pageCount}
        onClick={requestNextPage}
      />
    );
  }
});

const LastPageBtn = createComponent({
  name: 'LastPageBtn',
  view({ parentProps: { currentPage, pageCount, requestLastPage } }) {
    return (
      <IconButton
        icon={MdLastPage}
        disabled={currentPage === pageCount}
        onClick={requestLastPage}
      />
    );
  }
});

let view = function(props) {
  const {
    currentPage,
    pageCount,
  } = props;

  // let { before, after } = showSurround();
  return (
    <div className="pagination">
      <FirstPageBtn parentProps={props} />
      <PrevPageBtn parentProps={props} />

      <div className="pagination_indicator">
        {
        /*
        <div className="pagination_indicator_before">{before}</div>
         */
        }
        <div className="pagination_indicator_current">{currentPage} / {pageCount}</div>

        {
          /*
        <div className="pagination_indicator_after">{after}</div>
           */
        }
      </div>

      <NextPageBtn parentProps={props} />
      <LastPageBtn parentProps={props} />
    </div>
  );
};


view = createComponent({ name, view });
export default view;
export { init, view };


