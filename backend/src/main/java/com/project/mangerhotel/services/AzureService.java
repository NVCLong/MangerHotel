package com.project.mangerhotel.services;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class AzureService {
    @Autowired
    BlobServiceClient blobServiceClient;
    @Autowired
    BlobContainerClient blobContainerClient;

    public String upload(MultipartFile file) throws IOException {

        //todo uuid
        String fileName= UUID.randomUUID().toString()+"."+file.getOriginalFilename().split("\\.")[1];
        BlobClient blobClient= blobContainerClient.getBlobClient(fileName);
        blobClient.upload(file.getInputStream(), file.getSize(),true);

        return fileName;
    }

    public byte[]  getFile(String filename){
        System.out.println(filename);
        BlobClient blobClient= blobContainerClient.getBlobClient(filename);
        ByteArrayOutputStream outputStream= new ByteArrayOutputStream();
        blobClient.downloadStream(outputStream);
        final byte[] bytes=outputStream.toByteArray();
        return bytes;
    }

    public String updateImage(String filename, MultipartFile newFile) throws IOException{
        // delete the existing file
        BlobClient blobClient= blobContainerClient.getBlobClient(filename);
        blobClient.deleteIfExists();

        //
        String fileName= UUID.randomUUID().toString()+"."+newFile.getOriginalFilename().split("\\.")[1];
        blobClient= blobContainerClient.getBlobClient(fileName);
        blobClient.upload(newFile.getInputStream(),newFile.getSize(), true);
        return fileName;
    }

    public void deleteImage(String fileName){
        BlobClient blobClient=blobContainerClient.getBlobClient(fileName);
        if(blobClient== null){
            return;
        }else{
            blobClient.deleteIfExists();
        }
    }
}
