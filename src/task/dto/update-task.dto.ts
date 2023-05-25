import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator'
import { IsNull } from 'sequelize-typescript'

export class UpdateTaskDto {
  @IsString()
  readonly title: string

  @IsBoolean()
  readonly completed: boolean

  @IsBoolean()
  readonly priority: boolean

  readonly completionDate: Date

  @IsNumber()
  readonly categoryId: number
}

// async search(query: string): Promise<Track[]> {
//   const tracks = await this.trackModel.find({
//     name: { $regex: new RegExp(query, 'i') },
//   })
//   return tracks
// }

// @Get('/search')
//   search(@Query('query') query: string) {
//     return this.trackService.search(query)
//   }

// @Get()
//   getAll(@Query('count') count: number, @Query('offset') offset: number) {
//     return this.trackService.getAll(count, offset)
//   }

// async searchGenres(searchTerm?: string): Promise<DocumentType<GenreModel>[]> {
//   let options = {}

//   if (searchTerm) {
//     options = {
//       $or: [
//         { name: new RegExp(searchTerm, 'i') },
//         { description: new RegExp(searchTerm, 'i') },
//         { slug: new RegExp(searchTerm, 'i') },
//       ],
//     }
//   }

//   return await this.GenreModel.find(options)
//     .select('-updatedAt -__v')
//     .sort({ createdAt: 'desc' })
//     .exec()
// }

// @Get()
// 	async searchGenres(@Query('searchTerm') searchTerm?: string) {
// 		return this.genreService.searchGenres(searchTerm)
// 	}
