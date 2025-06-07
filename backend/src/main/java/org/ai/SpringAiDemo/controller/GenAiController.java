package org.ai.SpringAiDemo.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.ai.SpringAiDemo.response.QuestionResponse;
import org.ai.SpringAiDemo.service.ChatService;
import org.ai.SpringAiDemo.service.ImageService;
import org.ai.SpringAiDemo.service.QuestionService;
import org.springframework.ai.image.ImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class GenAiController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private QuestionService recipeService;
    @GetMapping("ask-ai")
    public String getResponse(@RequestParam  String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("/generate-images")
    public void generateImages(HttpServletResponse response, @RequestParam  String prompt,@RequestParam(defaultValue = "hd") String quality
            ,@RequestParam(defaultValue = "1024") int height,@RequestParam(defaultValue = "1024") int width) throws IOException {
        ImageResponse imageResponse =imageService.generateImage(prompt,quality,height,width);
        List<String> imagesUrls= imageResponse.getResults().stream().map(result->result.getOutput().getUrl()).toList();
        response.sendRedirect(imagesUrls.getFirst());
    }
    @GetMapping("/questions")
    public QuestionResponse recipeCreator(@RequestParam String difficult) throws Exception {
        return recipeService.createQuestion(difficult);
    }

}
