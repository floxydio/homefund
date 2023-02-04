Semua Source kodingan ada di folder " src "

List di dalem src meliputi dari

**controllers** : Folder ini berfungsi untuk menyimpan sebuah logic business atau retrieve data dari database

contoh pembuatan controllers :
buat file " namacontroller.controller.ts "
isinya adalah

`
export class NamaController {
// Didalam sini berisi function untuk dipanggil di route api contoh disini saya ingin membuat business logic untuk get data
public async getData(req: Request, res: Response) {

      }

}

`

**database** : Database disini berfungsi untuk memanggil database init yang kita punya, berupa konfigurasi - sync

**graphql** : Graphql disini untuk pengganti RestAPI untuk memanggil sebuah data
[Apa itu GraphQL](https://www.dicoding.com/blog/graphql-api-vs-rest-api-apa-bedanya)

**middleware** : Ini untuk state penengah, ketika sudah oke dia akan lanjut
[Apa itu Middleware](https://aws.amazon.com/id/what-is/middleware/)

**models**: Untuk membuat object pada database

**routes** : Ini untuk kumpulan endpoint pada api
