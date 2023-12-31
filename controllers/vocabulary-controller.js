const {VocabularyData} =require('../models')

const vocabularyController = {
	getVocabulary:async (req,res,next)=>{
		try{
			const vocabulary = await VocabularyData.findByPk(req.params.id, {
        raw: true,
        nest: true,
      });
			if(!vocabulary){
				const err = new Error('單字不存在')
				throw err
			}
			return res.json(vocabulary)
		} catch(err){
			return next(err)
		}
	},
	postVocabulary:async (req,res,next)=>{
		try{
			const {
				UserId,
        OriginalText_Korean,
        OriginalText_Chinese,
        OriginalText_Japanese,
      } = req.body;
			
			const newVocabulary = await VocabularyData.create({
        UserId,
        OriginalText_Korean,
        OriginalText_Chinese,
        OriginalText_Japanese,
        TranslatedText_Korean: OriginalText_Korean,
        TranslatedText_Chinese: OriginalText_Chinese,
        TranslatedText_Japanese: OriginalText_Japanese,
      });
			return res.json({success:'ture', data:{vocabulary: newVocabulary}})
		} catch(err){
			return next(err)
		}
	},
	putVocabulary: async (req,res,next)=>{
		try{
			const {id} = req.params
			const { UserId,TranslatedText_Korean,
      TranslatedText_Chinese,
      TranslatedText_Japanese }=req.body
			// 查找現有單字
			const vocabulary = await VocabularyData.findOne({
				where:{
					id,
					UserId,
				}
			})

			if(!vocabulary){
				const err = new	Error('單字不存在')
				throw err
			}

			// 更新單字
			let updatedVocabulary = await vocabulary.update({
				
        TranslatedText_Korean:
          TranslatedText_Korean || vocabulary.TranslatedText_Korean,
        TranslatedText_Chinese:
          TranslatedText_Chinese || vocabulary.TranslatedText_Chinese,
        TranslatedText_Japanese: TranslatedText_Japanese||vocabulary.TranslatedText_Japanese
      });

			updatedVocabulary = updatedVocabulary.toJSON()

			return res.json({success:true, data:{vocabulary: updatedVocabulary}})

		}catch(err){
			return next(err)
		}
	}
}

module.exports=vocabularyController