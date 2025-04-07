import React from 'react'
import OptionInputTile from '../input/OptionInputTile';
import Rating from './Rating';
import ImageOptionInput from '../input/ImageOptionInput';

const Poll_Conetent = ({
    type,
    options,
    selectedOptionIndex,
    onOptionSelect,
    rating,
    onRatingChange,
    userResponse,
    onResponseChange,
}) => {
  
    switch (type) {
        case "single-choice":
        case "yes/no" :
            return (
                <>
                {
                    options.map((option,i)=>(
                        <OptionInputTile
                        key={i}
                        isSelected={selectedOptionIndex === i}
                        label={option.optionText || ""}
                        onSelect = {()=>onOptionSelect(i)}
                        
                        />
                    ))
                }
                </>
            )

            case "rating" :
                return <Rating value={rating} onRatingChange={onRatingChange}  />

            case  "open-ended":
                return (
                    <div className='-mt-3'>
                             <textarea
                             placeholder='Your response'
                             className='w-full text-[13px] text-black outline-none bg-slate-200/80 p-3 rounded-md mt-2'
                             rows={4}
                             value={userResponse}
                             onChange={({target})=>onResponseChange(target.value)}
                             />
                    </div>
                )

                case "image-based" :
                    return (
                        <div className='grid grid-cols-2 gap-4'>
                                {
                                    options.map((image,i)=>(
                                        <ImageOptionInput 
                                        key={i}
                                        isSelected={selectedOptionIndex === i}
                                        imagUrl = {image.optionText || ''}
                                        onSelect={()=>onOptionSelect(i)}
                                        />
                                    ))
                                }
                        </div>
                    ) 
    
        default:
            break;
    }
}

export default Poll_Conetent